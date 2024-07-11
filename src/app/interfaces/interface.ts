export interface DropdownProps {
  label: string;
  value: string;
}

export interface EditableTableHeader {
  headerLabel: string;
  inputType:
    | FieldTypes
    | Omit<FieldTypes, 'select'>
    | Omit<FieldTypes, 'others'>;
  key: string;
  selectOptions?: DropdownProps[];
  tableHeaders?: EditableTableHeader[];
}

export type FieldTypes =
  | 'text'
  | 'number'
  | 'radio'
  | 'checkbox'
  | 'select'
  | 'textarea'
  | 'others';
