import { v4 as uuidv4 } from 'uuid';

export function getUUID(key: string = 'app_uuid'): string {
  let id = localStorage.getItem(key);

  if (!id) {
    id = uuidv4();
    localStorage.setItem(key, id);
  }

  return id;
}
