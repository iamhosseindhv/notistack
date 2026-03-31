import React, { useState, forwardRef, useCallback } from 'react';
import { styled } from '@mui/material/styles';
import { useSnackbar, SnackbarContent } from 'notistack';
import Collapse from '@mui/material/Collapse';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const StyledSnackbarContent = styled(SnackbarContent)(({ theme }) => ({
  '@media (min-width:600px)': {
    minWidth: '344px !important',
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  width: '100%',
  backgroundColor: '#fddc6c',
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: '#000',
}));

const StyledCardActions = styled(CardActions)(({ theme }) => ({
  padding: '8px 8px 8px 16px',
  justifyContent: 'space-between',
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  padding: '8px 8px',
  color: '#000',
  transition: 'all .2s',
  '&.expandOpen': {
    transform: 'rotate(180deg)',
  },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  padding: 16,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  padding: 0,
  textTransform: 'none',
}));

const StyledCheckCircleIcon = styled(CheckCircleIcon)(({ theme }) => ({
  fontSize: 20,
  paddingRight: 4,
}));

interface ReportCompleteProps {
  id: string | number;
  message: string;
  allowDownload?: boolean;
}

const ReportComplete = forwardRef<HTMLDivElement, ReportCompleteProps>(
  ({ id, message, ...props }, ref) => {
    const { closeSnackbar } = useSnackbar();
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = useCallback(() => {
      setExpanded((oldExpanded) => !oldExpanded);
    }, []);

    const handleDismiss = useCallback(() => {
      closeSnackbar(id);
    }, [id, closeSnackbar]);

    return (
      <StyledSnackbarContent ref={ref}>
        <StyledCard>
          <StyledCardActions>
            <StyledTypography variant="body2">
              {message}
            </StyledTypography>
            <div>
              <StyledIconButton
                aria-label="Show more"
                size="small"
                onClick={handleExpandClick}
                className={expanded ? 'expandOpen' : ''}
              >
                <ExpandMoreIcon />
              </StyledIconButton>
              <StyledIconButton
                size="small"
                onClick={handleDismiss}
              >
                <CloseIcon fontSize="small" />
              </StyledIconButton>
            </div>
          </StyledCardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Paper sx={{ bgColor: '#fff', p: 2 }}>
              <Typography
                gutterBottom
                variant="caption"
                style={{ color: '#000', display: 'block' }}
              >
                PDF ready
              </Typography>
              <StyledButton size="small" color="primary">
                <StyledCheckCircleIcon />
                Download now
              </StyledButton>
            </StyledPaper>
          </Collapse>
        </StyledCard>
      </StyledSnackbarContent>
    );
  }
);

ReportComplete.displayName = 'ReportComplete';

export default ReportComplete;
