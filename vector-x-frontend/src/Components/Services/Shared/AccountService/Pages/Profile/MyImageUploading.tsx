//React Import
import React, { useState, useEffect } from 'react';
//ImageUploading Import
import ImageUploading, { ImageListType } from 'react-images-uploading';
//MyComponent Import
import { useUserContext } from '../../../../../../Context/UserContext'
import { useColorLabel } from '../../../../../../Context/UseColorLabel';
import { useColorMode, ColorModeContextProps } from '../../../../../../Context/ColorModeContext';
import MyButton from '../../../../../Common/User Interface/MyButton';
//MUI Import
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const MyImageUploading: React.FC = () => {

    const { themeMode }: ColorModeContextProps = useColorMode();
    const { getUser, updateAvatar } = useUserContext();
    const { getColorFromLabel } = useColorLabel('green');
    let user = getUser();
    let defaultAvatarPath = themeMode === 'dark' ? '/images/default-avatars/dark.jpg' : '/images/default-avatars/light.jpg';
    const [feedbackMessage, setFeedbackMessage] = useState<string | undefined>(undefined);
    const [isError, setIsError] = useState<boolean | undefined>(undefined);

    const apiUrl = process.env.REACT_APP_API_URL as string;

    const addImagePrefix = (image: string) => {
        const subString = 'data:image/png;base64,';

        if (image.startsWith(subString)) {
            return image;
        }

        return subString + image;
    };

    const onClickSave = (avatar: string) => {

        const logerr = (reason: any): void => {
            console.error(`onClickSave logged error: ${reason}`)
            setFeedbackMessage(`Failed to save avatar: ${reason}`)
            setIsError(true)
        }

        fetch(`${apiUrl}/api/userDataRedaction/redactAvatar`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: user.userId,
                avatar: avatar
            })
        }).then((resp): void => {
            if (!resp.ok) {
                logerr("POST failed")
                return
            }
            resp.json().then((data): void => {
                setFeedbackMessage("Avatar updated successfully")
                updateAvatar(avatar)
                setIsError(false)
            }).catch((reason): void => {
                logerr(reason)
            })
        }).catch((reason): void => {
            logerr(reason)
        })
    };

    // Установка начального значения для imageList
    const [image, setImage] = React.useState<ImageListType>([
        {
            data_url: user.avatar ? addImagePrefix(user.avatar) : defaultAvatarPath
        }
    ]);

    const maxNumber = 1; // Задаем максимальное количество изображений равным 1

    useEffect(() => {
        setImage([
            {
                data_url: user.avatar ? addImagePrefix(user.avatar) : defaultAvatarPath
            }
        ]);
    }, [defaultAvatarPath])

    useEffect(() => {
        console.debug(`feedbackMessage: ${feedbackMessage}`)
        console.debug(`isError: ${isError}`)
    }, [feedbackMessage, isError]);

    const onChange = (imageList: ImageListType) => {
        // data for submit
        setImage(imageList);
    };

    const removeImage = () => {
        setImage([
            {
                data_url: defaultAvatarPath
            }
        ]);
        //updateFeedbackMessage(true, '');
    };

    return (
        <div className="App">
            <ImageUploading
                value={image}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
            >
                {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                }) => (
                    <div className="upload__image-wrapper">
                        <Typography sx={{
                            textAlign: 'left',
                            color: { isError } ? getColorFromLabel('red') : getColorFromLabel('green'),
                        }}
                        >
                            {feedbackMessage}
                        </Typography>
                        {imageList.length > 0 && (
                            <div
                                className="image-item"
                                style={{
                                    width: '20rem',
                                    height: '20rem',
                                    borderRadius: '50%',
                                    overflow: 'hidden'
                                }}
                            >
                                <img
                                    src={imageList[0]['data_url']}
                                    alt=""
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                    }}
                                />
                                <Box className="image-item__btn-wrapper"
                                    style={{
                                        position: 'absolute',
                                        top: '32rem',
                                        left: '1.25rem',
                                        width: '22.75rem',
                                        zIndex: 1,
                                    }}
                                    sx={{
                                        '@media screen and (max-width: 850px)': {
                                            display: 'flow',
                                        },
                                    }}
                                >
                                    <MyButton
                                        variant='contained'
                                        onClick={() => {
                                            onImageUpdate(0);
                                        }}
                                        sx={{
                                            marginBottom: '0.5rem',
                                            minWidth: '100%',
                                            height: '3.4rem'
                                        }}
                                    >
                                        Update
                                    </MyButton>
                                    <MyButton
                                        variant='contained'
                                        onClick={() => {
                                            removeImage();
                                        }}
                                        sx={{
                                            marginBottom: '0.5rem',
                                            minWidth: '100%',
                                            height: '3.4rem'
                                        }}
                                    >
                                        Remove
                                    </MyButton>
                                    <MyButton
                                        variant='contained'
                                        onClick={() => {
                                            onClickSave(imageList[0]['data_url']);
                                        }}
                                        sx={{
                                            marginBottom: '0.5rem',
                                            minWidth: '100%',
                                            height: '3.4rem'
                                        }}
                                    >
                                        Save
                                    </MyButton>
                                </Box>
                            </div>
                        )}
                    </div>
                )}
            </ImageUploading>

        </div>
    );
};

export default MyImageUploading;
