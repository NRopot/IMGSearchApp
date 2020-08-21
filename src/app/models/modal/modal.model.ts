export interface ModalWindowModel {
  header: string;
  mode: CollectionModalMode;
  payload?: any;
}

export type CollectionModalMode = 'add' | 'create';
