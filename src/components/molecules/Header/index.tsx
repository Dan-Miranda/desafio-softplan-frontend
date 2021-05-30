import React, { MouseEvent, useState } from 'react';
import {
  AppBar, IconButton, Link, Toolbar, Typography, Menu as MenuApp, MenuItem, Grid, Icon,
} from '@material-ui/core';
import { GitHub, LinkedIn, Menu } from '@material-ui/icons';

import styles from './Header.module.scss';

const Header: React.FC = () => {
  const [menu, setMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="relative" className={styles.HeaderContainer}>
      <Toolbar variant="dense">
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h6" color="inherit">
              Desafio SoftPlan
            </Typography>
          </Grid>
          <Grid item>
            <Link href="https://www.linkedin.com/in/danillo-miranda/" target="_blank">
              <IconButton>
                <LinkedIn className={styles.HeaderIcons} />
              </IconButton>
            </Link>
            <Link href="https://hub.docker.com/r/danillomiranda/desafio-softplan/tags?page=1&ordering=last_updated" target="_blank">
              <IconButton>
                <img
                  alt="ícone docker"
                  className={styles.HeaderIcons}
                  src="https://cdn.iconscout.com/icon/free/png-256/docker-3215391-2673809.png"
                />
              </IconButton>
            </Link>
            <IconButton
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
            >
              <GitHub className={styles.HeaderIcons} />
            </IconButton>

          </Grid>
        </Grid>

        <MenuApp
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <Link href="https://github.com/Dan-Miranda/desafio-softplan-backend" target="_blank">
              Backend
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link href="https://github.com/Dan-Miranda/desafio-softplan-frontend" target="_blank">
              Frontend
            </Link>
          </MenuItem>
        </MenuApp>

      </Toolbar>
    </AppBar>
  );
};

export default Header;
