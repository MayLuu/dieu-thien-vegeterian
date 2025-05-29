"use server"
import { cookies } from "next/headers"

export default async function setLanguageValue(locale: string) {
  cookies().set('language', locale)
}