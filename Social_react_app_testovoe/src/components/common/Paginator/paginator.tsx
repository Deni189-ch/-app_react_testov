import React from 'react';

import {CaretLeftOutlined,  CaretRightOutlined} from "@ant-design/icons";
import { Button } from 'antd';
import styles from "./Paginator.module.css";

//отрисовка нумерации юзеров
type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNamber: number) => void
    portionSize?: number
}
const Paginator: React.FC <PropsType & { className: string }> = ({totalUsersCount, pageSize, currentPage, onPageChanged, portionSize = 10}) => {
    //pagesCount общее число пользователей, pageSize размер стр.
    const pagesCount = Math.ceil(totalUsersCount / pageSize)

    const pages: Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    //кол-во блоков вывода страниц.
    const portionCount = Math.ceil(pagesCount / portionSize)
    const [portionNumber, setPortionNumber] = React.useState<number>(1)
    //левая граница вывода.
    const leftPortionNumber = (portionNumber - 1) * portionSize + 1;
    //правая граница вывода.
    const rightPortionNumber = portionNumber * portionSize


    return <div>

        {portionNumber > 1 &&
        <Button type="primary" shape="circle" onClick={() => {
            setPortionNumber(portionNumber - 1)
        }}>
            <CaretLeftOutlined />
        </Button>}

        {pages
            .filter(p => p >= leftPortionNumber && p <= rightPortionNumber)
            .map(p => {
                return <span key={p} className={currentPage === p ? styles.selectedPage : ""}
                             onClick={(e) => {
                                 onPageChanged(p);
                             }}>{p} </span>
            })}
        {portionCount > portionNumber &&

        <Button type="primary" shape="circle" onClick={() => {
            setPortionNumber(portionNumber + 1)
        }}>
            <CaretRightOutlined />
        </Button>
        }
    </div>
}

export default Paginator;