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

export interface Service {
  /** Unique id for the service template */
  id: number;
  code: string;
  title: string;
  /** Service description */
  description: string;
  info: string;
  termsUrl: string;
  modules: Module[];
}

export interface Module {
  id: number;
  name: string;
  title: string;
  sections: Section[];
}
export interface Section {
  id: number;
  /**
   * Unique name of the section. The section name MUST be unique within the service template.
   * @example "requester"
   */
  name: string;
  /**
   * Title of the section
   * @example "Richiedente"
   */
  title: string;
  /**
   * Description of the section
   * @example "Informazione su di te"
   */
  description: string;
  fields: Field[];
  subsections: SubsectionElement[];
}

export interface SubsectionElement {
  name: SubsectionEnum;
  title: string;
}
export enum SubsectionEnum {
  Addresses = 'addresses',
  Contacts = 'contacts',
  Registry = 'registry',
  Request = 'request',
}

export interface Field {
  id: number;
  name: string;
  title: string;
  subtitle?: string;
  placeholder?: string;
  description?: string;
  /**
   * Reference to a {@link Subsection.name} . Fields belonging to the same subsection
   * are grouped together. The order of fields within the subsection follows the
   * same order of the {@link Section.fields} fields array
   */
  subsection?: { name: string };
  mandatory?: boolean;
  readonly?: boolean;
  hidden?: boolean;
  /* additional options for configuring some specific field types, example select options */
  selectOptions?: string[];
  value?: string;
  valueFn?: string;
}
