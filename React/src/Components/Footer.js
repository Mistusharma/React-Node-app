import React from 'react';

const Footer = () => {
    return (
        <footer style={styles.footer}>
            <div style={styles.row}>
                <div style={styles.column}>
                    <ul style={styles.list}>
                        <li style={styles.listItem}><a href='/about' style={styles.link}>About us</a></li>
                        <li style={styles.listItem}><a href='/contact' style={styles.link}>Contact us</a></li>
                    </ul>
                </div>
                <div style={styles.column}>
                    <ul style={styles.list}>
                        <li style={styles.listItem}><a href='#' style={styles.link}>Terms of Use</a></li>
                        <li style={styles.listItem}><a href='#' style={styles.link}>Cookie & Privacy Policy</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

const styles = {
    footer: {
        backgroundColor: 'lightPink',
        color: '#fff',
        padding: '24px',
        textAlign: 'center',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        position: 'fixed',
        bottom: '0',
        width: '100%', // Make sure it spans the full width
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: '40px', // Add gap between columns
    },
    column: {
        flex: '1', // Equal width for each column
    },
    list: {
        listStyle: 'none',
        padding: 0,
    },
    listItem: {
        fontSize: '20px',
        margin: '10px 0', // Add spacing between list items vertically
    },
    link: {
        color: '#333',
        textDecoration: 'none',
        transition: 'color 0.3s ease',
    },
    linkHover: {
        color: '#ccc',
    },
};

export default Footer;
