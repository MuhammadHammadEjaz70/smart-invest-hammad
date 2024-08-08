import InputField from '@/resuable/InputField'
import Typography from '@/resuable/Typography'
import { postDataToApi } from '@/utils/general';
import { Bars } from "react-loader-spinner";
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { toast } from 'react-toastify';
import Buttons from "../../../resuable/Button/Button";

function ChangePassword() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState<boolean>(false);

    const userId = localStorage.getItem("userId");

    useEffect(() => {
        document.title = "Change Password -Smart Invest";
    }, []);

    const handleSubmit = async (e: any) => {
        setLoading(true);
        e.preventDefault();
        if (newPassword !== confirmNewPassword) {
            toast.error("New Password and Confirm Password Do not Match!");
            setLoading(false);
            return;
        }
        if (oldPassword === newPassword) {
            toast.error("Old Password and New Password cannot be the same!");
            setLoading(false);
            return;
        }
        const data = {
            oldPassword: oldPassword,
            newPassword: newPassword,
            confirmNewPassword: confirmNewPassword,
            userId,
        };

        try {
            const response = await postDataToApi("api/auth/change-password", data);
            if (response.status === 200) {
                toast.success("Password changed Successful");
                setOldPassword("");
                setNewPassword("");
                setConfirmPassword("");
            } else {
                toast.error("Failed to change password");
            }
        } catch (error) {
            toast.error(
                `Invalid Old Password`
            );
        } finally{
            setLoading(false);
        }
    }

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
            <Typography variant='text20Profile'>
                Change Password
            </Typography>

            <form onSubmit={handleSubmit} className={`w-100`}>
                <Row className='mt-4'>
                    <Col lg={4} md={6} sm={12}>
                        <InputField
                            label="Old Password"
                            name="oldPassword"
                            placeholder="Enter Password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            type="password"
                            mode="dark"
                            required={true}
                        />
                    </Col>
                    <Col lg={4} md={6} sm={12}>
                        <InputField
                            label="New Password"
                            name="newPassword"
                            placeholder="Enter New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            type="password"
                            mode="dark"
                            required={true}
                        />
                    </Col>
                    <Col lg={4} md={6} sm={12}>
                        <InputField
                            label="Confirm New Password"
                            name="confirmNewPassword"
                            placeholder="Enter Password"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            type="password"
                            mode="dark"
                            required={true}
                        />
                    </Col>
                    <div className='d-flex justify-content-end'>
                        <Buttons variant="background" children="Change password" type="submit" />
                    </div>
                </Row>
            </form>
        </div>
    )
}

export default ChangePassword