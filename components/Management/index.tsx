import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Typography from '@/resuable/Typography';
import InputField from '@/resuable/InputField';
import { fetchGetDataApi, postDataToApi } from '@/utils/general';
import { toast } from 'react-toastify';
import Banner from '@/resuable/Banners/Banner';
import { Bars } from 'react-loader-spinner';

interface CoinData {
    currentValue: number;
    currentPercentage: number;
}

function Management() {
    const [coins, setCoins] = useState<any>();
    const [loading, setLoading] = useState(false);
    const [requests, setRequests] = useState<CoinData | null>(null);
    const [res, setRes] = useState<any>({});

    const HandleWithdrawCoins = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await postDataToApi(`api/coin/`, {
                "title": "smart coin", "value": coins
            });
            if (response.status === 200) {
                setCoins("");
                window.location.reload();
                toast.success("Coins updated request Successful");
            }
        } catch (error: any) {
            if (error.response) {
                const errorMessage = error.response.data.message;
                toast.error(errorMessage);
            } else {
                toast.error("Something Went Wrong!");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        document.title = "Management - Smart Invest";
        fetchData();
    }, [res]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetchGetDataApi("api/dashboard/coin");
            if (response) {
                setRequests({ 
                    currentValue: response.data.result.currentValue, 
                    currentPercentage: parseFloat(response.data.result.percentageChange)
                });
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Bars
                height="80"
                width="80"
                color="#ECAC1A"
                ariaLabel="bars-loading"
                wrapperStyle={{}} 
                wrapperClass="loading-spinner-overlay"
                visible={loading}
            />
            <Row>
                <Typography variant='text28light'>
                    Coins Management
                </Typography>
                <Col lg={12} className="mt-3">
                    {requests ? (
                        <Banner
                            variant="chart-banner"
                            className="banner-bg-image"
                            children="Smart Invest Coin Value"
                            value={requests.currentValue}
                            percentage={requests.currentPercentage}
                        />
                    ) : (
                        null
                    )}
                </Col>

                <form onSubmit={HandleWithdrawCoins} className="p-0">
                    <Row className="m-0">
                        <InputField
                            label="Add Coins"
                            placeholder="Enter Number of Coins"
                            value={coins}
                            onChange={(e) => setCoins(e.currentTarget.value)}
                            type="text"
                            mode="dark"
                            name="coins"
                            borderRadius="35px"
                            backgroundColor="#151515"
                            color="#C0C0C0"
                            width="100%"
                            required={true}
                            showAdditionalField={true}
                            buttonText="Add Coins"
                        />
                    </Row>
                </form>
            </Row>
        </div>
    );
}

export default Management;
