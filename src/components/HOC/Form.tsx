import React, { FormEventHandler, ReactNode } from 'react';

export interface IFormProps {
  children: ReactNode;
  className?: string;
  onSubmit?: FormEventHandler<HTMLFormElement>;
}

const Form: (props: IFormProps) => JSX.Element = (props: IFormProps): JSX.Element => {
  return (
    <form onSubmit={props.onSubmit} className={props.className} noValidate autoComplete="off">
      {props.children}
    </form>
  );
};

export default Form;
