import { FieldTypes } from '../../interfaces/interface';

interface SectionFieldWithoutOptions {
  label: string;
  value: string;
  type: Omit<FieldTypes, 'select' | 'others'>;
}

interface SectionFieldWithOptions {
  label: string;
  value: string;
  type: 'select';
  /**
   * @description
   * Select option is required only if the field type is select
   */
  selectOptions: { label: string; value: string }[];
}

interface SectionFieldForNestedTables {
  label: string;
  value: string;
  type: 'others';
  tableHeaders: SectionFieldTypes[];
}

export type SectionFieldTypes =
  | SectionFieldWithoutOptions
  | SectionFieldWithOptions
  | SectionFieldForNestedTables;
