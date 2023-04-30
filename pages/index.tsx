import ItemCard from "components/ItemCard";
import { Box, Button, Container, FormControl, Paper, TextField, Typography } from "@mui/material";

import Head from "next/head";
import movieApi from "client";

import { useRouter } from "next/router";
import { LocalItemGeneral } from "types";
import { FormEvent } from "react";

export const getServerSideProps = async () => {
  const trendingMovies = await movieApi.movies.getTrending();
  const trendingTv = await movieApi.tv.getTrending();

  return {
    props: {
      movies: trendingMovies,
      tv: trendingTv
    }
  }
}

interface HomeProps{
  movies: LocalItemGeneral[],
  tv: LocalItemGeneral[]
}

const Home = ({ movies, tv }:HomeProps) => {
  const router = useRouter();

  const handleFormSubmit = (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push({ pathname: '/search', query: { query: event.currentTarget.search.value } })
  }

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Paper elevation={0} sx={{ pt: 6, pb: 8 }}>
        <Container maxWidth='lg'>
          <Typography mb={2} component='h2' variant='h3' fontWeight={700}>Welcome.</Typography>
          <Typography mb={{ xs: 4, sm: 6 }} component='h3' variant='subtitle1'>Millions of movies, TV shows and people to discover. Explore now.</Typography>
          <FormControl component='form' fullWidth onSubmit={handleFormSubmit} sx={{ position: 'relative' }}>
            <TextField name='search' size='small' autoComplete='off' placeholder='Search for a movie or tv show' color='neutral' />
            <Button variant='contained' disableElevation color="secondary" sx={{ position: { xs: 'relative', sm: 'absolute' }, mt: { xs: 2, sm: 0 }, height: '100%', top: 0, right: 0, textTransform: 'none', px: 6 }}>Search</Button>
          </FormControl>
          <Box mt={{ xs: 4, sm: 8 }}>
            <Typography mb={1} fontWeight={700} variant="h5" component="h3">Trending movies</Typography>
            {
              movies.length &&
              <Box sx={{
                position: 'relative',
                '&::after': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  height: '100%',
                  width: 60,
                  background: 'linear-gradient(to right, var(--color-fade-start), var(--color-fade-end))'
                }
              }}>
                <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto' }}>
                  {
                    movies.map(({ title, release, poster, id }) => <ItemCard key={id} maxWidth={{ xs: 120, sm: 180, md: 260 }} imgHeight={{ xs: 180, sm: 270, md: 390 }} sx={{ flexShrink: 0 }} title={title} releaseDate={release} posterPath={poster} path={`movies/${id}`} />)
                  }
                </Box>
              </Box>
            }
          </Box>
          <Box mt={8}>
            <Typography mb={1} fontWeight={700} variant="h5" component="h3">Trending TVShows</Typography>
            {
              tv.length &&
              <Box sx={{
                position: 'relative',
                '&::after': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  height: '100%',
                  width: 60,
                  background: 'linear-gradient(to right, var(--color-fade-start), var(--color-fade-end))'
                }
              }}>
                <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto' }}>
                  {
                    tv.map(({ title, release, poster, id }) => <ItemCard key={id} maxWidth={{ xs: 120, sm: 180, md: 260 }} imgHeight={{ xs: 180, sm: 270, md: 390 }} sx={{ flexShrink: 0 }} title={title} releaseDate={release} posterPath={poster} path={`tv/${id}`} />)
                  }
                </Box>
              </Box>
            }
          </Box>
        </Container>
      </Paper>
    </>
  )
};

export default Home;