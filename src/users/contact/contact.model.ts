export interface AddContactRequest {
  readonly username: string;
}

export interface RemoveContactRequest {
  readonly username: string;
}

export interface Contact {
  readonly username: string;
  readonly firstName: string;
  readonly lastName: string;
}
