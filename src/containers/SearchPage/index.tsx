import { Repo, useToGetGithubRepos } from '../../services/githubService'
import styled from 'styled-components'
import { CircularProgress, Grid, InputAdornment, Pagination, TextField } from '@mui/material'
import { Search } from '@mui/icons-material'
import { ChangeEvent, useEffect, useState } from 'react'
import useDebounce from '../../hooks/useDebounce'
import CustomCard from '../../components/CustomCard'
import { updateDataToLocalStorage } from '../../utils/localStorage'
import { toast } from 'react-toastify'

const SearchPage = () => {
  const [searchValue, setSearchValue] = useState('')
  const [paginatiion, setPagination] = useState({ perPage: 10, currentPage: 1 })
  const debouncedSearchTerm = useDebounce(searchValue, 500)
  const {
    data: githubRepoList,
    isLoading,
    isError,
  } = useToGetGithubRepos(
    {
      searchTerm: debouncedSearchTerm,
      perPage: paginatiion.perPage,
      pageNum: paginatiion.currentPage,
    },
    { retry: false, enabled: !!debouncedSearchTerm },
  )

  const handleChange = (value: string) => {
    setSearchValue(value)
  }

  useEffect(() => {
    if (debouncedSearchTerm || isError) {
      setPagination({ ...paginatiion, currentPage: 1 })
    }
  }, [debouncedSearchTerm, isError])

  const onPageChange = (event: ChangeEvent<unknown>, pageNum: number) => {
    setPagination({ ...paginatiion, currentPage: pageNum })
  }

  const onFavClick = (item: Repo) => {
    updateDataToLocalStorage({ key: 'favRepos', data: item })
    toast.success('Added to Bookmark')
  }

  return (
    <SearchPageContainer>
      <SearchBarContainer>
        <StyledTextFiled
          id='outlined-basic'
          label='Search'
          value={searchValue}
          variant='outlined'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Search />
              </InputAdornment>
            ),
          }}
          onChange={(e) => handleChange(e.target.value)}
        />
      </SearchBarContainer>
      {isLoading ? (
        <LoaderContainer>
          <CircularProgress />
        </LoaderContainer>
      ) : (
        <></>
      )}
      {githubRepoList?.items?.length ? (
        <ListContainer>
          <Grid container spacing={1}>
            {githubRepoList?.items.map((item) => (
              <Grid xs={12} key={item?.id}>
                <CustomCard
                  key={item?.id}
                  repoName={item.name}
                  ownerName={item.owner?.name || ''}
                  ownerDescription={item.description || ''}
                  stars={item.stargazers_count || 0}
                  createdDate={item.created_at}
                  avatarUrl={item?.owner?.avatar_url || ''}
                  onFavClick={onFavClick}
                  item={item}
                />
              </Grid>
            ))}
          </Grid>
        </ListContainer>
      ) : (
        <>
          {!githubRepoList?.items?.length && debouncedSearchTerm && !isLoading ? (
            <ImgContainer>
              <NoDataImg src='https://streamnow.appswamy.com/assets/img/no-data-found.png' />
            </ImgContainer>
          ) : (
            <></>
          )}
        </>
      )}
      {githubRepoList && githubRepoList?.total_count > 10 ? (
        <StyledPagination
          count={Math.round(githubRepoList?.total_count / 10)}
          page={paginatiion.currentPage}
          onChange={onPageChange}
        />
      ) : (
        <></>
      )}
    </SearchPageContainer>
  )
}
export default SearchPage

const SearchPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const SearchBarContainer = styled.div``
const ListContainer = styled.div`
  max-width: 1000px;
`
const LoaderContainer = styled.div`
  margin-top: 50%;
`
const StyledTextFiled = styled(TextField)`
  @media (min-width: 1200px) {
    min-width: 500px !important;
  }
`
const StyledPagination = styled(Pagination)`
  margin-top: 20px;
`
const ImgContainer = styled.div`
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
const NoDataImg = styled.img`
  width: 200px;
  height: 200px;
`
