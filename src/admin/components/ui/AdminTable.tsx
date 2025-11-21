import React from 'react';
import { cn } from '../../utils/cn';

interface AdminTableProps extends React.HTMLAttributes<HTMLTableElement> {
  children: React.ReactNode;
}

export const AdminTable: React.FC<AdminTableProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className="overflow-x-auto">
      <table
        className={cn('w-full', className)}
        {...props}
      >
        {children}
      </table>
    </div>
  );
};

export const AdminTableHeader: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <thead
      className={cn('bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200', className)}
      {...props}
    >
      {children}
    </thead>
  );
};

export const AdminTableRow: React.FC<React.HTMLAttributes<HTMLTableRowElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <tr
      className={cn('border-b border-gray-100', className)}
      {...props}
    >
      {children}
    </tr>
  );
};

export const AdminTableHead: React.FC<React.HTMLAttributes<HTMLTableCellElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <th
      className={cn('px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider', className)}
      {...props}
    >
      {children}
    </th>
  );
};

export const AdminTableCell: React.FC<React.HTMLAttributes<HTMLTableCellElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <td
      className={cn('px-6 py-4 text-sm text-gray-900', className)}
      {...props}
    >
      {children}
    </td>
  );
};

export const AdminTableBody: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <tbody
      className={cn('bg-white divide-y divide-gray-100', className)}
      {...props}
    >
      {children}
    </tbody>
  );
};

