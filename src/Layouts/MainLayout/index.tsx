import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import styled from 'styled-components'

interface Props {
  window?: () => Window
}

const drawerWidth = 240
const navItems = [
  { title: 'Search', path: '/' },
  { title: 'Bookmark', path: '/bookmark' },
]

const MainLayout = (props: Props) => {
  const { window } = props
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState)
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant='h6' sx={{ my: 2 }}>
        GitHub Repository Search
      </Typography>
      <Divider />
      <List>
        {navItems.map(({ title, path }) => (
          <StyledLink to={path} key={path}>
            <ListItem key={title} disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <ListItemText primary={title} />
              </ListItemButton>
            </ListItem>
          </StyledLink>
        ))}
      </List>
    </Box>
  )

  const container = window !== undefined ? () => window().document.body : undefined

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component='nav'>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            GitHub Repository Search
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map(({ title, path }) => (
              <Link to={path} key={path}>
                <Button key={title} sx={{ color: '#fff' }}>
                  {title}
                </Button>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component='nav'>
        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component='main' sx={{ p: 3 }} style={{ margin: '0 auto' }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  )
}

export default MainLayout

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`
