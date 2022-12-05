import React, {FC, useState} from 'react';
import style from './Note.module.scss';
import {dataType} from "../../types";
import pencil from './../../icons/pencil.png';
import ok from './../../icons/390973.png'
interface noteProps {
    id: number,
    text: string,
    title: string,
    db: dataType[],
    setDB: Function,
    setHashTags:Function,
    hashTags:string[]
}

const Note: FC<noteProps> = ({id, text, title, db, setDB,setHashTags}) => {
    const [edited, setEdit] = useState(false);

    const removeNote = (id: number) => {
        setDB(db.filter(item => {
            return item.id !== id
        }));
    };

    const [note, setNote] = useState({
        id: id,
        title: title,
        text: text,
    });

    const onTextEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setNote({id: id, title: note.title, text: e.currentTarget.value});
        markHashtag(e.currentTarget.value)
    };

    const markHashtag = (str:string) => {
        const hashtag = /#[0-9A-Za-zА-Яа-яё]+/g;
        let res:Array<string> | any = str.match(hashtag);
        let set = Array.from(new Set(res.flat()))
        setHashTags([...set])
    };
/*    const markColoredTag = (str:string) => {
        const hashtag = /#[0-9A-Za-zА-Яа-яё]+/g;
        let res = str.replace(hashtag,():any=> {
            return(<span className={style.colored__tag}>{res.slice(1)}</span>)
        })
    }*/
    const onFinishEditing = () => {
        db.filter(item => {
            if (item.id === id) {
                item.text = note.text
            }
        });
        setDB([...db]);
        setEdit(!edited);
    }

    return (
        <div className={style.note__container}>
            {edited ? <img alt={'end editing'} onClick={() => onFinishEditing()}
                           src={ok}></img> :
                <img onClick={() => setEdit(!edited)} alt={'edit'}
                     src={pencil}></img>}
            <div onClick={() => removeNote(id)} className={style.cross}></div>
            <div className={style.text__container}>
                <p className={style.title}>{title}</p>
            </div>
            <div className={style.text__container}>
                {edited ? <input onChange={(e) => onTextEdit(e)} value={note.text}></input> :
                    <p className={style.text}>{text}</p>}
            </div>
        </div>
    );
};

export default Note;