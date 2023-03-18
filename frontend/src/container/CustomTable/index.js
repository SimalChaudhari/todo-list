import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Tooltip } from "@material-ui/core";
import { CloudDownload } from "@material-ui/icons";

import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

import ToolkitProvider, {
  CSVExport,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min";
const { ExportCSVButton } = CSVExport;
import "../../assets/styles/table.css";

class CustomTable extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const customTotal = (from, to, size) => (
      <span
        style={{ marginLeft: "5px" }}
        className="react-bootstrap-table-pagination-total"
      >
        Showing {from} to {to} of {size} Results
      </span>
    );

    // const options = {
    //     paginationSize: 5,
    //     pageStartIndex: 1,
    //     nextPageTitle: 'First page',
    //     prePageTitle: 'Pre page',
    //     firstPageTitle: 'Next page',
    //     lastPageTitle: 'Last page',
    //     showTotal: true,
    //     paginationTotalRenderer: customTotal,
    //     sizePerPageList: [
    //         {
    //             text: '10',
    //             value: 10,
    //         },
    //         {
    //             text: '25',
    //             value: 25,
    //         },
    //         {
    //             text: 'All',
    //             value: this.props.tableData && this.props.tableData.length,
    //         },
    //     ],
    // };

    return (
      <React.Fragment key={this.props.keyField || ""}>
        <ToolkitProvider
          keyField={this.props.keyField}
          data={
            this.props.tableData && this.props.tableData.length
              ? this.props.tableData
              : []
          }
          columns={this.props.columns}
          search
          exportCSV={{
            fileName: this.props.exportFileName
              ? `${this.props.exportFileName}.csv`
              : "custom.csv",
          }}
        >
          {(props) => {
            return (
              <div>
                <div>
                  {this.props.showdownload ? (
                    <ExportCSVButton {...props.csvProps}>
                      <Tooltip
                        title="Download csv file"
                        style={{ color: "#4B49AC" }}
                      >
                        <CloudDownload />
                      </Tooltip>
                    </ExportCSVButton>
                  ) : null}
                </div>
                <BootstrapTable
                  responsive
                  hover
                  defaultSorted={this.props.defaultSortedBy}
                  rowStyle={this.props.rowStyle}
                  condensed
                  key={this.props.keyField || ""}
                  keyField={this.props.keyField}
                  noDataIndication={this.props.noDataIndication}
                  // pagination={paginationFactory(options)}
                  // selectRow={this.props.selectRow || null}
                  {...props.baseProps}
                  rowEvents={
                    this.props.onClickRow
                      ? { onClick: this.props.onClickRow }
                      : {}
                  }
                ></BootstrapTable>
              </div>
            );
          }}
        </ToolkitProvider>
      </React.Fragment>
    );
  }
}

export default React.memo(CustomTable);
