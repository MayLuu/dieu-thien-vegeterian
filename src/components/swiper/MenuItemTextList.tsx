import { Validate } from "@/utils/validate";
import React from "react";

type MenuItemListTextProps = {
  items: any[];
  locale: string;
};

const MenuItemListText: React.FC<MenuItemListTextProps> = ({
  items,
  locale,
}) => {
  return (
    <div>
      {items?.map((item, index) => (
        <div
          key={index * 100}
          className="drink-text-menu"
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <p className="drink-text"> {item.name[locale]}</p>
          <p className="drink-price"> {Validate.unit(Number(item.price))}₫</p>
        </div>
      ))}
    </div>
  );
};

export default MenuItemListText;
