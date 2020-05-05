import React from 'react'
export const AlbumCover = (props) =>  {
    const src = props.track.track.album.images[0].url;
    const alt = "Album cover for " + props.track.track.album.name;
    return (
        <img src={src} alt={alt} style={{ width: 400, height: 400 }} />
    );
}
