import logoIPG from './../../assets/logo-IPG.png';
import style from './header.module.css';

export default function Header() {
  return (
    <header className={style.header}>
      <img src={logoIPG} alt='IPG Logo'/>
      <h1>Todo List</h1>
    </header>
  )
}