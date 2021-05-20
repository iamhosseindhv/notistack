import * as styles from '@material-ui/core/styles';

export default function createTheme(newTheme) {
  return styles.createMuiTheme ? styles.createMuiTheme(newTheme) : styles.createTheme(newTheme);
}