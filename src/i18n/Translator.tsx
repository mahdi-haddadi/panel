import {ReactNode,FC,Fragment} from 'react';
import { useSelector } from "react-redux";
import { RootState, states } from "../redux/store";
import { langs } from "./langs";
// export class Translator {
//   lang: any;
//   constructor() {
//     let langCode: string = states.config.language;
//     this.lang = langs[langCode] ?? "";
//   }
//   _(key: string): string {
//     return this.lang[key] ? this.lang[key] : "";
//   }
// }

const translate = (text: string, language: string):string => {
  return langs[language][text] || text;
};

const Translator:FC<{children:string}> = ({ children }):JSX.Element => {
  const { language } = useSelector((state: RootState) => state.config);
  return <Fragment>{translate(children, language)}</Fragment>
};

export default Translator;
