import { useState, useEffect } from "react";
import { useSearchParams } from 'react-router-dom';

import styles from "./status.module.css";

import Page from "Blocks/Page/Page";
import Preloader from "Blocks/Preloader/Preloader";
import Alert from "Blocks/Alert/Alert";

import { getPayment } from "Api";
// import formatAmount from "./formatAmount.util";

function Status() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState(false);

    return (
        <div>
            <>
                <Page
                    title={`Платеж #${id}`}
                    
                    type="pending">

                    <div className={styles.container}>
                        { error && <Alert message={error} type="danger" /> }

                        { fetching && <div className={styles.preloader}>
                            <Preloader text="Загружаем данные об оплате..." size="medium"/>
                        </div> }
                    </div>

                </Page>
            </>
        </div>
    );
}

export default Status;
