
const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');
const axios = require('axios');
require('dotenv').config();

const { GOOGLE_SHEET_URL } = process.env;
if (!GOOGLE_SHEET_URL) {
  throw new Error('GOOGLE_SHEET_URL is not defined in the environment variables');
}

type MenuItem = {
  name: {
    vi: string;
    en: string;
    zh: string;
  };
  price: string;
  desc: {
    vi: string;
    en: string;
    zh: string;
  },
  img: string;
  bestSeller: boolean;
  isSpicy: boolean;
};

type Category = {
  icon: string;
  items: MenuItem[];
};

type Menu = {
  [categoryName: string]: Category;
};

type MenuJson = {
  food: Menu;
  drink: Menu;
};

const downloadXlsxFile = async (url: string, filePath: string) => {
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'arraybuffer',
  });
  fs.writeFileSync(filePath, response.data);
};

const xlsxFilePath = path.resolve(__dirname, '../../public/data/menu.xlsx');
const menuJsonFilePath = path.resolve(__dirname, '../../public/data/menu.json');
const categoryJsonFilePath = path.resolve(__dirname, '../../public/data/category.json');

const categories: { [key: string]: { key: string; icon: string }[] } = {};

const menu: MenuJson = {
  food: {},
  drink: {},
};

const isValidRow = (row: any): boolean => {
  const requiredFields = [
    'Category', 
    'Name', 
    'Name_en', 
    'Name_zh', 
    'Price', 
  ];
  return requiredFields.every(field => row[field]);
};

const parseXlsx = () => {
  const workbook = XLSX.readFile(xlsxFilePath);
  const sheetNames = workbook.SheetNames;

  sheetNames.forEach((sheetName: string) => {
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    const lowerSheetName = sheetName.toLowerCase();

    if (lowerSheetName === 'helper') {
      jsonData.forEach((row: any) => {
        Object.keys(row).forEach((key) => {
          const lowerKey = key.toLowerCase();
          if (!categories[lowerKey]) {
            categories[lowerKey] = [];
          }
          row[key].split(',').forEach((item: string) => {
            categories[lowerKey].push({ key: item.trim(), icon: `/icons/${item.trim()}.svg` });
          });
        });
      });
      return;
    }

    jsonData.forEach((row: any) => {
      if (!isValidRow(row)) {
        return;
      }

      const { Category, Name, Price, Desc, Image, Favorite, Name_en, Desc_en, Name_zh, Desc_zh, Spicy } = row;
      const bestSeller = String(Favorite).toLowerCase() === 'true';
      const isSpicy = String(Spicy).toLowerCase() === 'true';

      const item: MenuItem = {
        name: { vi: Name, en: Name_en, zh: Name_zh },
        price: Price || 0,
        desc: { vi: Desc, en: Desc_en, zh: Desc_zh },
        img: Image || '/logo.svg',
        bestSeller,
        isSpicy
      };

      if (lowerSheetName === 'food' || lowerSheetName === 'drink') {
        if (!menu[lowerSheetName][Category]) {
          menu[lowerSheetName][Category] = {
            icon: `/icons/${Category}.svg`,
            items: []
          };
        }
        menu[lowerSheetName][Category].items.push(item);
      }
    });
  });
};

const writeJson = () => {
  fs.writeFileSync(menuJsonFilePath, JSON.stringify(menu, null, 2), 'utf-8');
  fs.writeFileSync(categoryJsonFilePath, JSON.stringify(categories, null, 2), 'utf-8');
};

const generateMenuJson = async () => {
  try {
    await downloadXlsxFile(GOOGLE_SHEET_URL, xlsxFilePath);
    parseXlsx();
    writeJson();
    console.log('Excel file has been converted to JSON');
  } catch (error) {
    console.error('Error processing Excel file:', error);
  }
};

generateMenuJson();
