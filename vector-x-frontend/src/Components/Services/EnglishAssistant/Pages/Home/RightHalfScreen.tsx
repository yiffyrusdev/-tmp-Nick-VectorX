﻿//MUI Import
import FormControlLabel from '@mui/material/FormControlLabel';
import MyCheckbox from '../../../../Common/User Interface/MyCheckBox';
import Box from '@mui/material/Box';

//MyComponents Import
import MyButton from '../../../../Common/User Interface/MyButton';
import MyInputBase from '../../../../Common/User Interface/MyInputBase'
import DictionaryEditorForm from './DictionaryEditorForm'
import BackgroundImage from './BackgroundImage'

const RightHalfScreen: React.FC = () => {
    return (
        <>
            <BackgroundImage />
            <Box
                sx={{
                    marginTop: '0.4rem',
                }}
            >
                <MyInputBase
                    style={{
                        marginTop: '0.4rem', width: '100%',
                        height: '3.2rem', fontSize: '1.3rem'
                    }}
                />
                <MyButton
                    variant="contained"

                    style={{
                        width: '100%',
                        marginTop: '1rem',
                        fontSize: '1.3rem',
                        height: '3.1rem',
                        borderColor: 'black',
                        borderBottomColor: 'black'
                    }}
                >
                    Translate
                </MyButton>
                <FormControlLabel
                    sx={{
                        '.css-1ejercq-MuiTypography-root': { fontSize: '1.6rem', fontWeight: 250 },
                        '.css-i4bv87-MuiSvgIcon-root': { width: '2rem', height: '2rem' },
                        width: '100%'
                    }}

                    control={
                        <MyCheckbox defaultChecked />}
                    label="Translate and save"
                />
                <DictionaryEditorForm />
            </Box>
        </>
    )
}

export default RightHalfScreen;