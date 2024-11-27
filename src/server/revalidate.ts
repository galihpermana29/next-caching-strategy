'use server';

import { revalidateTag } from 'next/cache';

export async function revalidation(tagName: string) {
  revalidateTag(tagName);
}
