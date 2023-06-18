import * as React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { red } from '@mui/material/colors'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { StarRate } from '@mui/icons-material'
import { Repo } from '../../services/githubService'

const CustomCard = ({
  repoName,
  ownerDescription,
  stars,
  createdDate,
  avatarUrl,
  onFavClick,
  item,
  isFav = false,
}: {
  repoName: string
  ownerName?: string
  ownerDescription: string
  stars: number
  createdDate: string
  avatarUrl: string
  onFavClick: (item: Repo) => void
  item: Repo
  isFav?: boolean
}) => {
  return (
    <Card sx={{ maxWidth: 945, margin: 2 }}>
      <CardHeader
        avatar={<Avatar src={avatarUrl} sx={{ bgcolor: red[500] }} />}
        action={
          <IconButton size={'small'} onClick={() => onFavClick(item)}>
            {stars ? (
              <>
                {stars}
                <StarRate />
              </>
            ) : (
              <></>
            )}
            <FavoriteIcon color={isFav ? 'error' : 'inherit'} />
          </IconButton>
        }
        title={repoName}
        subheader={createdDate ? new Date(createdDate).toLocaleString() : ''}
      />
      <CardContent>
        <Typography variant='body2' color='text.secondary'>
          {ownerDescription}
        </Typography>
      </CardContent>
    </Card>
  )
}
export default CustomCard
