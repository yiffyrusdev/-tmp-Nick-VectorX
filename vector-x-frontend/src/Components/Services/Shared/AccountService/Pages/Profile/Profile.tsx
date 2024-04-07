//React Import
import React, {useEffect, useState} from 'react'

//MUI Import
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';

//MyComponents Import
import Header from '../../../../../Common/Header/Header';
import MyImageUploading from './MyImageUploading';
import MyTypography from '../../../../../Common/User Interface/MyTypography';
import MyButton from '../../../../../Common/User Interface/MyButton';
import MyAutoComplete from '../../../../../Common/User Interface/MyAutoComplete';
import RedactModal from './RedactModal';
import { useUserContext } from '../../../../../../Context/UserContext'

const Profile: React.FC = () => {
    
    const { getUser } = useUserContext();
    const user = getUser();

    const [selectedField, setSelectedField] = useState('Username');

    const handleFieldSelectionChange = (fieldSelection: string) => {
        setSelectedField(fieldSelection);
    };

    useEffect(()=>{
        console.log(selectedField);
    },[selectedField])

    interface AttributeValueProps  {
        attribute: string;
        value: string;
        sx?: React.CSSProperties | {
            [key: string]: React.CSSProperties | undefined;
        } ; // Либо CSS-правила, либо media-теги
    }

    const MyAccountTypography: React.FC = () => {

        return (
            <>
                <MyTypography
                    color='primary'
                    sx={{
                        marginTop: '4.75rem',
                        fontSize: '3rem',
                        overflow: 'hidden'
                    }}
                >
                    My Account
                </MyTypography>
            </>
        )
    }

    const Avatar: React.FC = () => {

        return (
            <>
                <Box 
                    sx={{ 
                        marginTop: '0.5rem',
                    }}
                >
                    <MyImageUploading />
                </Box>
            </>
        )
    }

    const AttributeValue: React.FC<AttributeValueProps> = ({ attribute, value, sx }) => {
        return (
            <>
                <MyTypography
                    color = 'primary'
                    sx = {{
                        ...sx,
                        fontSize: '2.25rem',
                        float: 'left',
                        marginRight: '1rem',
                        '@media screen and (max-width: 850px)': {
                            float: 'none'
                        }
                    }}
                >
                    {attribute}
                </MyTypography>
                <Typography
                    sx = {{
                        ...sx,
                        fontSize: '2.25rem',
                    }}
                >
                    {value}
                </Typography>
            </>
        )
    }

    const fieldSelectionDropList = [
        { title: 'Username' },
        { title: 'Password' },
    ]

    return (
        <>
            <Header />
            <Box 
                display='flex'
                sx = {{
                    '@media screen and (max-width: 850px)': {
                        display: 'flow',
                    },
                    marginLeft: '2.5rem'
                }}
            >
                <Box 
                >
                    <MyAccountTypography />
                    <Avatar/>
                </Box>
                <Box 
                    sx = {{
                        marginLeft: '5rem',
                        width: '100%',
                        '@media screen and (max-width: 850px)': {
                            display: 'flow',
                            marginLeft: '0',
                            marginTop: '10rem'
                        },
                    }}
                >
                    <AttributeValue 
                        attribute = "Username:"
                        value = {user.username}
                        sx = {{
                            marginTop: '4.75rem',
                            '@media screen and (max-width: 850px)': {
                                marginTop: '1rem',
                            }
                        }}
                    />
                    <AttributeValue 
                        attribute = "Role:"
                        value = {user.userRole}
                        sx = {{marginTop: '1rem',}}
                    />
                    <AttributeValue 
                        attribute = "Password:"
                        value = '●●●●●●●'
                        sx = {{marginTop: '1rem',}}
                    />
                    <Box
                        sx = {{
                            display: 'flex',
                        }}
                    >
                        <MyAutoComplete 
                            label = 'Field Selection'
                            dropList={fieldSelectionDropList}
                            size='medium'
                            onFieldSelectionChange={handleFieldSelectionChange}
                            defaultValue={{title: selectedField} }
                            sx = {{
                                marginTop: '1rem',
                                marginRight: '1rem',
                                width: '60%',
                            }}
                        />
                        <RedactModal selectedField={selectedField}/>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default Profile;