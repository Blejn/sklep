import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

type Locale = 'en' | 'pl';
const locales: Locale[] = ['en', 'pl'];
type Messages = {
  [key: string]: string;
};
 
export default getRequestConfig(async ({locale}) => {
  if (!locales.includes(locale as Locale)) notFound();
  const messagesModule = (await import(`../messages/${locale}.json`)) as { default: Messages };

  return {
    messages: messagesModule.default
  };
});