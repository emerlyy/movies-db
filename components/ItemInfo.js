import { calculateRuntime } from "@/helpers/calculateRuntime";
import { Box, Paper, Popover, Typography } from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { usePopover } from "@/hooks/usePopover";
import Image from "next/image";



const ItemInfo = ({ item }) => {

  const [anchorEl, open, handlePopoverOpen, handlePopoverClose] = usePopover();

  const { title, genres, release_date, runtime, tagline, vote_average, poster, vote_count, overview } = item || {};

  const [year, month, day] = release_date.split('-');

  const duration = calculateRuntime(runtime);

  return (
    <Paper elevation={0} sx={{ mx: 'auto', my: 6, width: 1000, overflow: 'hidden', bgcolor: 'transparent', color: '#fff' }}>
      <Box sx={{ p: 4, width: '100%', display: 'flex', columnGap: 3, bgcolor: 'transparent', backdropFilter: 'blur(5px)', backgroundImage: `linear-gradient(to right, rgba(20, 20, 20, 1), rgba(20, 20, 20, 0.7) 65%, rgba(20, 20, 20, 0.7) 100%)` }}>
        <Image alt='Poster' src={poster} width={300} height={450} style={{ borderRadius: '2px' }} />
        <Box>
          <Box mb={3} sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', columnGap: 1 }}>
            <Typography sx={{ width: '100%', fontWeight: 700 }} component='h2' variant='h4'>
              {title} <Typography component='span' variant='h4' color='gray'>({year})</Typography>
            </Typography>
            <Typography component='span' variant="body2">{day}/{month}/{year}</Typography>
            <CircleIcon sx={{ fontSize: 6 }} />
            <Box sx={{ display: 'flex', columnGap: 1 }}>
              {
                genres.map(({ name, id }) => <Typography key={id} component='span' variant="body2">{name}</Typography>)
              }
            </Box>
            <CircleIcon sx={{ fontSize: 6 }} />
            {duration && <Typography component='span' variant="body2">{duration.hours}h {duration.minutes}m</Typography>}
          </Box>
          <Box mb={5} sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              onMouseEnter={handlePopoverOpen}
              onMouseLeave={handlePopoverClose}
              mr={2}
              sx={{ width: 70, height: 70, bgcolor: '#081c22', borderRadius: '50%', p: .5 }}>
              <CircularProgressbarWithChildren styles={buildStyles({ pathColor: "#21d07a", trailColor: '#204529', backgroundColor: '#3e98c7' })} value={vote_average} maxValue={10}>
                <Typography component='span' variant="h5" fontWeight='bold'>{Math.round(vote_average * 10)}</Typography>
              </CircularProgressbarWithChildren>
            </Box>
            <Typography fontWeight='bold' component='span' variant="body2">User<br />Score</Typography>
            <Popover
              disableScrollLock={true}
              sx={{
                mt: '2px',
                pointerEvents: 'none',
              }}
              open={open}
              anchorEl={anchorEl}
              onClose={handlePopoverClose}
              disableRestoreFocus
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <Typography px={2} py={1}>{vote_count} votes</Typography>
            </Popover>
          </Box>
          <Typography component='span' variant="subtitle1" sx={{ fontStyle: 'italic' }} >{tagline}</Typography>
          <Box mt={5}>
            <Typography mb={1} variant="h6" component='h3'>Overview</Typography>
            <Typography variant="body2" component='p'>{overview}</Typography>
          </Box>
        </Box>
      </Box>
    </Paper >
  );
}

export default ItemInfo;