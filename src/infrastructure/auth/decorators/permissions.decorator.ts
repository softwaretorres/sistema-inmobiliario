import { SetMetadata } from '@nestjs/common';

export const PERMISSIONS_KEY = 'permissions';

export const Permissions = (...permissions: string[]): ReturnType<typeof SetMetadata> =>
  SetMetadata(PERMISSIONS_KEY, permissions);

// Common permission helpers
export const CanCreate = (subject: string): ReturnType<typeof SetMetadata> =>
  Permissions(`create:${subject}`);

export const CanRead = (subject: string): ReturnType<typeof SetMetadata> =>
  Permissions(`read:${subject}`);

export const CanUpdate = (subject: string): ReturnType<typeof SetMetadata> =>
  Permissions(`update:${subject}`);

export const CanDelete = (subject: string): ReturnType<typeof SetMetadata> =>
  Permissions(`delete:${subject}`);

export const CanManage = (subject: string): ReturnType<typeof SetMetadata> =>
  Permissions(`manage:${subject}`);
