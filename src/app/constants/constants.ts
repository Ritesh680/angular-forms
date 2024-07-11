import { INPUT_FIELD_TYPES } from '../@types/enums';
import { SectionFieldTypes } from '../pages/template/template.interface';

export const MODULES = ['PRIVACY', 'GENERAL', 'PREFERENCE', 'SUMMARY'];
export const FIELD_TYPES = [
  'TEXT',
  'NUMBER',
  'EMAIL',
  'PASSWORD',
  'DATE',
  'TIME',
  'SELECT',
  'CHECKBOX',
  'RADIO',
  'TEXTAREA',
  'BUTTON',
];

export const NUMBER_FORMAT = [
  { label: 'EURO', value: 'euro' },
  { label: 'PERCENT', value: 'percent' },
];

export const SECTION_TYPES = [
  {
    label: 'PRIVACY',
    value: 'privacy',
  },
  { label: 'Card', value: 'card' },
  { label: 'File', value: 'multifile' },
];

export const SECTION_FIELD_TYPES = [
  { label: 'TEXT', value: 'text' },
  { label: 'NUMBER', value: 'number' },
  { label: 'EMAIL', value: 'email' },
  { label: 'PASSWORD', value: 'password' },
  { label: 'DATE', value: 'date' },
  { label: 'TIME', value: 'time' },
  { label: 'SELECT', value: 'select' },
  { label: 'CHECKBOX', value: 'checkbox' },
  { label: 'RADIO', value: 'radio' },
  { label: 'TEXTAREA', value: 'textarea' },
  { label: 'BUTTON', value: 'button' },
];

export const sectionFields: SectionFieldTypes[] = [
  { label: 'Name', value: 'name', type: INPUT_FIELD_TYPES.TEXT },
  { label: 'Title', value: 'title', type: INPUT_FIELD_TYPES.TEXT },
  {
    label: 'Description',
    value: 'description',
    type: INPUT_FIELD_TYPES.TEXTAREA,
  },
  {
    label: 'Type',
    value: 'type',
    type: INPUT_FIELD_TYPES.SELECT,
    selectOptions: SECTION_FIELD_TYPES,
  },
  { label: 'Subtitle', value: 'subtitle', type: INPUT_FIELD_TYPES.TEXT },
  {
    label: 'Placeholder',
    value: 'placeholder',
    type: INPUT_FIELD_TYPES.TEXTAREA,
  },
  { label: 'Mandatory', value: 'mandatory', type: INPUT_FIELD_TYPES.CHECKBOX },
  { label: 'Readonly', value: 'readonly', type: INPUT_FIELD_TYPES.CHECKBOX },
  { label: 'Hidden', value: 'hidden', type: INPUT_FIELD_TYPES.CHECKBOX },
  {
    label: 'ShowCondition',
    value: 'showCondition',
    type: INPUT_FIELD_TYPES.TEXT,
  },
  { label: 'Value', value: 'value', type: INPUT_FIELD_TYPES.TEXT },
  { label: 'ValueFn', value: 'valueFn', type: INPUT_FIELD_TYPES.TEXT },
  {
    label: 'Format',
    value: 'format',
    type: INPUT_FIELD_TYPES.SELECT,
    selectOptions: NUMBER_FORMAT,
  },
  // { label: 'SelectOptions', value: 'selectOptions', type: INPUT_FIELD_TYPES.SELECT },
];

export const sections = [
  { label: 'Name', value: 'name', type: INPUT_FIELD_TYPES.TEXT },
  { label: 'Title', value: 'title', type: INPUT_FIELD_TYPES.TEXT },
  {
    label: 'Description',
    value: 'description',
    type: INPUT_FIELD_TYPES.TEXTAREA,
  },
  {
    label: 'Type',
    value: 'type',
    type: INPUT_FIELD_TYPES.SELECT,
    selectOptions: SECTION_TYPES,
  },
  {
    label: 'Subsections',
    value: 'subsections',
    type: INPUT_FIELD_TYPES.SELECT,
  },
  {
    label: 'ShowCondition',
    value: 'showCondition',
    type: INPUT_FIELD_TYPES.TEXT,
  },
];
