import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import React, { MouseEvent, useState } from 'react';
import classes from './Paginator.module.css';

type PropsType = {
    currentPage: number
    totalUsersCount : number
    pageSize : number
    onPageChanged : (p: number) => void
    portionSize? : number     
}

const Paginator: React.FC<PropsType> = ({ portionSize = 10, totalUsersCount, pageSize,  currentPage, ...props }) => {


    let [portionNumber, setPortionNumber] = useState<number>(1);
    let pagesCount = Math.ceil(totalUsersCount / pageSize);
    let pages: Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    const portionCount = Math.ceil(pagesCount / portionSize)
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    const rightPortionPageNumber = portionNumber * portionSize;

    
    return <div className={classes.pages}>
        {portionNumber > 1 &&
            <button className={classes.setPortionPagesButton} onClick={() => { setPortionNumber(portionNumber - 1) }}>            
                {<CaretLeftOutlined />}
            </button>}

        {pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map((p) => {
                return <span className={currentPage === p ? classes.selectedPage : classes.Page}
                    key={p}
                    onClick={(e: MouseEvent<HTMLSpanElement>) => {
                        props.onPageChanged(p);
                    }}>{p}</span>
            })}
        {portionCount > portionNumber &&
            <button className={classes.setPortionPagesButton} onClick={() => { setPortionNumber(portionNumber + 1) }}>                
                {<CaretRightOutlined />}
            </button>}
    </div>
}

export default Paginator;