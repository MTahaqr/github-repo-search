import { Repo } from '../../services/githubService'
import styled from 'styled-components'
import { Grid } from '@mui/material'
import { useState } from 'react'
import CustomCard from '../../components/CustomCard'
import { deleteDataToLocalStorage, getDataFromLocalStorage } from '../../utils/localStorage'
import { toast } from 'react-toastify'

const BookmarkPage = () => {
  const [repoList, setRepoList] = useState(getDataFromLocalStorage({ key: 'favRepos' }))
  const onFavClick = (item: Repo) => {
    deleteDataToLocalStorage({ key: 'favRepos', id: item.id })
    toast.success('Removed From FBookmark')
    setTimeout(() => setRepoList(getDataFromLocalStorage({ key: 'favRepos' })), 1000)
  }

  return (
    <BookmarkPageContainer>
      <ListContainer>
        <Grid container spacing={1}>
          {repoList.length &&
            repoList.map((item: Repo) => (
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
                  isFav
                />
              </Grid>
            ))}
        </Grid>
      </ListContainer>
    </BookmarkPageContainer>
  )
}
export default BookmarkPage

const BookmarkPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const ListContainer = styled.div`
  max-width: 1000px;
`
