import React, { useState } from 'react';
import {
	withStyles,
	makeStyles,
	useTheme,
	IconButton,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableContainer,
	TableRow,
	TableFooter,
	TablePagination,
} from '@material-ui/core';


import Paper from '@material-ui/core/Paper';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

const StyledTableCell: any = withStyles((theme) => ({
	head: {
		// backgroundColor: '#',
		color: theme.palette.common.white,
	},
	body: {
		fontFamily: 'Poppins',
		color: 'black',
		fontSize: '1.5rem',
	},
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
	root: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.action.hover,
		},
	},
}))(TableRow);

const useStyles = makeStyles({
	table: {
		minWidth: 500,
	},
	header: {
		fontSize: '1.5rem',
	}
});

const useStyles1 = makeStyles((theme) => ({
	root: {
		flexShrink: 0,
		marginLeft: theme.spacing(2.5),
	},
}));

type TablePaginationActionsProps = {
	count: number,
	page: number,
	rowsPerPage: number,
	onChangePage: any;
	onPageChange: any;
};

const TablePaginationActions: React.FC<TablePaginationActionsProps> = (props) => {
	const classes = useStyles1();
	const theme = useTheme();
	const { count, page, rowsPerPage, onChangePage } = props;

	const handleFirstPageButtonClick = (event: any) => {
		onChangePage(event, 0);
	};

	const handleBackButtonClick = (event: any) => {
		onChangePage(event, page - 1);
	};

	const handleNextButtonClick = (event: any) => {
		onChangePage(event, page + 1);
	};

	const handleLastPageButtonClick = (event: any) => {
		onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
	};

	return (
		<div className={classes.root}>
			<IconButton
				onClick={handleFirstPageButtonClick}
				disabled={page === 0}
				aria-label='first page'
			>
				{theme.direction === 'rtl' ? (
					<LastPageIcon />
				) : (
					<FirstPageIcon />
				)}
			</IconButton>
			<IconButton
				onClick={handleBackButtonClick}
				disabled={page === 0}
				aria-label='previous page'
			>
				{theme.direction === 'rtl' ? (
					<KeyboardArrowRight />
				) : (
					<KeyboardArrowLeft />
				)}
			</IconButton>
			<IconButton
				onClick={handleNextButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label='next page'
			>
				{theme.direction === 'rtl' ? (
					<KeyboardArrowLeft />
				) : (
					<KeyboardArrowRight />
				)}
			</IconButton>
			<IconButton
				onClick={handleLastPageButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label='last page'
			>
				{theme.direction === 'rtl' ? (
					<FirstPageIcon />
				) : (
					<LastPageIcon />
				)}
			</IconButton>
		</div>
	);
};


type CustomizedTableProps = {
	header: Array<any>,
	rows: Array<any>;
	color: string;
};

const CustomizedTable: React.FC<CustomizedTableProps> = ({ header, rows, color }) => {
	const classes = useStyles();
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const handleChangePage = (event: any, newPage: number) => {
		setPage(newPage);
	};

	const emptyRows =
		rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

	const handleChangeRowsPerPage = (event: any) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};
	return (
		<TableContainer component={Paper}>
			<Table className={classes.table} aria-label='customized table'>
				<TableHead>
					<TableRow className={classes.header}>
						{header.map((head, index) => (
							<StyledTableCell
								key={index}
								style={{ background: color }}
							>
								<b className='b b--3 b--white text--bold'>{head}</b>
							</StyledTableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{(rowsPerPage > 0
						? rows.slice(
							page * rowsPerPage,
							page * rowsPerPage + rowsPerPage
						)
						: rows
					).map((row, index) => (
						<StyledTableRow key={index}>
							{Object.entries(row).map(([, val]) => (
								<StyledTableCell
									key={index.toString() + val}
									scope='row'
									align='left'
								>
									{val}
								</StyledTableCell>
							))}
						</StyledTableRow>
					))}
					{emptyRows > 0 && (
						<TableRow style={{ height: 53 * emptyRows }}>
							<TableCell colSpan={6} />
						</TableRow>
					)}
				</TableBody>
				<TableFooter>
					<TableRow>
						{/* <TablePagination
							rowsPerPageOptions={[
								5,
								10,
								25,
								{ label: 'All', value: -1 },
							]}
							colSpan={3}
							count={rows.length}
							rowsPerPage={rowsPerPage}
							page={page}
							SelectProps={{
								inputProps: { 'aria-label': 'rows per page' },
								native: true,
							}}
							onChangePage={handleChangePage}
							onChangeRowsPerPage={handleChangeRowsPerPage}
							ActionsComponent={TablePaginationActions}
						/> */}
					</TableRow>
				</TableFooter>
			</Table>
		</TableContainer>
	);
};

export default CustomizedTable;

// import React from 'react';

// type TableProps = {

// };

// const Table: React.FC<TableProps> = () => {

// 	return <div>Have a good coding</div>;
// };
// export default Table;