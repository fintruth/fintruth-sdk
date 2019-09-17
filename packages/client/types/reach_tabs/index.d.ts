declare module '@reach/tabs' {
  import {
    ButtonHTMLAttributes,
    ComponentType,
    ForwardRefExoticComponent,
    HTMLAttributes,
    PropsWithoutRef,
    ReactNode,
    RefAttributes,
  } from 'react'

  export interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    as?: keyof JSX.IntrinsicElements | ComponentType<any>
    isSelected?: boolean
  }

  export interface TabListProps extends HTMLAttributes<HTMLDivElement> {
    as?: keyof JSX.IntrinsicElements | ComponentType<any>
  }

  export interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
    as?: keyof JSX.IntrinsicElements | ComponentType<any>
  }

  export interface TabPanelsProps extends HTMLAttributes<HTMLDivElement> {
    as?: keyof JSX.IntrinsicElements | ComponentType<any>
  }

  export interface TabsProps
    extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    as?: keyof JSX.IntrinsicElements | ComponentType<any>
    children: ReactNode
    defaultIndex?: number
    index?: number
    onChange?: (index: number) => void
    readOnly?: boolean
  }

  export const Tab: ForwardRefExoticComponent<
    PropsWithoutRef<TabProps> & RefAttributes<HTMLButtonElement>
  >
  export const TabList: ForwardRefExoticComponent<
    PropsWithoutRef<TabListProps> & RefAttributes<HTMLDivElement>
  >
  export const TabPanel: ForwardRefExoticComponent<
    PropsWithoutRef<TabPanelProps> & RefAttributes<HTMLDivElement>
  >
  export const TabPanels: ForwardRefExoticComponent<
    PropsWithoutRef<TabPanelsProps> & RefAttributes<HTMLDivElement>
  >
  export const Tabs: ForwardRefExoticComponent<
    PropsWithoutRef<TabsProps> & RefAttributes<HTMLDivElement>
  >
}
