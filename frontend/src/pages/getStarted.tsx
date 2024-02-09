import Header from '@/components/Header';
import { Grid, Paper, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import React, {useState} from 'react'
import { templateData } from '../../mockdata';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

export default function getStarted() {
    const theme = useTheme();
    return (
        <>
            <Header />
            <Grid container justifyContent="center" alignItems="center" sx={{ height: '100vh' }} spacing={12}>
                <Grid item xs={11}>
                    <ImageList cols={4} gap={8}>
                        {templateData.map((item) => (
                            <ImageListItem
                                key={item.img}
                                sx={{
                                    borderRadius: 2,
                                    position: 'relative',
                                    overflow: 'hidden',
                                    transition: 'transform 0.3s ease',
                                    '&:hover img': {
                                        transform: 'scale(1.2)',
                                    },
                                }}
                            >
                                <img
                                    srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                    src={`${item.img}?w=248&fit=crop&auto=format`}
                                    alt={item.title}
                                    loading="lazy"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                                />
                                <IconButton
                                    sx={{ position: 'absolute', top: 5, right: 5, color: 'white' }}
                                    aria-label="edit"
                                >
                                    <EditIcon />
                                </IconButton>
                                <ImageListItemBar
                                    title={item.title}
                                    actionIcon={
                                        <IconButton
                                            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                            aria-label={`info about ${item.title}`}
                                        >
                                        </IconButton>
                                    }
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </Grid>
            </Grid>
        </>
    )
}

