import React, { useEffect, useState } from 'react'
import styles from "./index.module.css"
import InputField from '@/resuable/InputField'
import Typography from '@/resuable/Typography'
import Buttons from "../../../resuable/Button/Button";
import { Col, Row } from 'react-bootstrap';
import Image from 'next/image';
import { SETTINGS_EDIT } from '@/utils/images';
import ProfileImage from '@/resuable/ProfileImage';
import { fetchGetDataApi, updateDataToApi } from "@/utils/general";
import { toast } from 'react-toastify';
import { useDispatch, } from 'react-redux';
import { setImageUrl } from "@/components/imageSlice";
import { Bars } from 'react-loader-spinner';

function Profile() {
    const dispatch = useDispatch();
    const [loading, setloading] = useState(false);
    const id = typeof window != "undefined" ? localStorage.getItem("userId") : null;
    useEffect(() => {
        fetchUserData(id)
    }, [])
    const [formData, setFormData] = useState({
        fullname: "",
        username: "",
        smartId: "",
        email: "",
        bio: "",
        phantomAddress: ""
    });
    const [selectedImage, setSelectedImage] = useState<any>();
    const [imageShow, setImageShow] = useState<any>();


    const fetchUserData = async (id: any) => {
        setloading(true);
        try {
            const response = await fetchGetDataApi(`api/user/show/${id}`);
            setFormData({
                fullname: response.data.result?.fullname || "",
                username: response.data.result?.username || "",
                smartId: response.data.result?.smartId || "",
                email: response.data.result?.email || "",
                bio: response.data.result?.bio || "",
                phantomAddress: response.data.result?.phantomAddress || ""
            });

            dispatch(setImageUrl(response.data.result.profilePicture));

        } catch (error: any) {
            if (error.response) {
                const errorMessage = error.response.data.message;
                toast.error(errorMessage);
            } else {
                toast.error("Request Failed For Show User Api !");
            }
            console.error("Error Fetching Response: ", error);
        }finally {
            setloading(false);
          }
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }
    const handleImageChange = (event: any) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(file)
            setImageShow(imageUrl)
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setloading(true);
        const userData = new FormData();
        userData.append("fullname", formData.fullname)
        userData.append("username", formData.username)
        userData.append("bio", formData.bio)
        userData.append("phantomAddress", formData.phantomAddress)
        if (selectedImage) {
            userData.append("profile", selectedImage)
        }
        try {
            const response = await updateDataToApi(`api/user/${id}`, userData);
            setFormData({
                fullname: response.data.result?.fullname || "",
                username: response.data.result?.username || "",
                smartId: response.data.result?.smartId || "",
                email: response.data.result?.email || "",
                bio: response.data.result?.bio || "",
                phantomAddress: response.data.result?.phantomAddress || ""
            });
            dispatch(setImageUrl(response.data.result?.profilePicture));
            setImageShow(null)

            toast.success("Updated Successfully");
        } catch (error: any) {
            if (error.response) {
                const errorMessage = error.response.data.message;
                toast.error(errorMessage);
            } else {
                toast.error("Request Failed For Show User Api !");
            }
            console.error("Error Fetching Response: ", error);
        }finally {
            setloading(false);
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
                <Col lg={12} md={12} sm={12}>
                    <Typography variant='text20Profile'>
                        Profile Settings
                    </Typography>
                    <form className='mt-4' onSubmit={handleSubmit}>
                        <div className={`mb-3 ${styles.imageCircle}`}>
                            {imageShow ?
                                <img src={imageShow} className={styles.showImage}/>
                                : <ProfileImage height={100} width={100} />

                            }
                            <label htmlFor="imageInput">
                                <Image src={SETTINGS_EDIT} alt='edit' style={{ cursor: 'pointer', position: 'absolute', right: '0', bottom: '0' }} />
                            </label>
                            <input
                                id="imageInput"
                                type="file"
                                accept=".jpg,.jpeg,.png"
                                onChange={handleImageChange}
                                style={{ display: 'none' }}
                            />
                        </div>
                        <Row>
                            <Col lg={4} md={6} sm={12}>
                                <InputField
                                    label="User Name"
                                    name="username"
                                    placeholder="User Name"
                                    value={formData?.username}
                                    onChange={handleChange}
                                    type="text"
                                    readOnly={true}
                                    mode="dark"
                                    required={true}
                                />
                            </Col>


                            <Col lg={4} md={6} sm={12}>
                                <InputField
                                    label="Email"
                                    name="Email"
                                    placeholder="Write Email"
                                    value={formData?.email}
                                    type="text"
                                    readOnly={true}
                                    mode="dark"
                                    required={true}
                                />
                            </Col>

                            <Col lg={4} md={6} sm={12}>
                                <InputField
                                    label="Smart Id"
                                    name="smartId"
                                    placeholder=""
                                    value={formData?.smartId}
                                    type="text"
                                    readOnly={true}
                                    mode="dark"
                                    required={true}
                                />
                            </Col>
                            <Col lg={12} md={6} sm={12}>
                                <InputField
                                    label="Full Name"
                                    name="fullname"
                                    placeholder="Full Name"
                                    value={formData?.fullname}
                                    onChange={handleChange}
                                    type="text"
                                    mode="dark"
                                    required={true}
                                />
                            </Col>
                            <Col lg={12} md={12} sm={12}>
                                <InputField
                                    label="Bio"
                                    name="bio"
                                    placeholder="Write Bio"
                                    value={formData?.bio}
                                    onChange={handleChange}
                                    type="textarea"
                                    mode="dark"
                                    required={true}
                                />
                            </Col>
                            <Col lg={12} md={12} sm={12}>
                                <InputField
                                    label="Phantom Address"
                                    name="phantomAddress"
                                    placeholder="Write Phantom Address"
                                    value={formData?.phantomAddress}
                                    onChange={handleChange}
                                    type="text"
                                    mode="dark"
                                    required={true}
                                />
                            </Col>
                        </Row>
                        <Buttons variant="background" children="Update Info" type="submit" />
                    </form>
                </Col>
            </Row>
        </div>
    )
}

export default Profile