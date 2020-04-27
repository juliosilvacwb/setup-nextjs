import { AddBox, ArrowDownward, Check, ChevronLeft, ChevronRight, Clear, DeleteOutline, Edit, FilterList, FirstPage, LastPage, Remove, SaveAlt, Search, ViewColumn } from '@material-ui/icons';
import MaterialTable from 'material-table';
import { useState } from 'react';
import { forwardRef } from 'react';

function Collection() {

    const [columns, setColumns] = useState<any>([
        { title: 'Name', field: 'name' },
        { title: 'Surname', field: 'surname', initialEditValue: 'initial edit value' },
        { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
        {
            title: 'Birth Place',
            field: 'birthCity',
            lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
        },
    ]);

    const [data, setData] = useState<any>([
        { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
        { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
    ]);

    return (
        <div style={{padding: '2em'}}>

            <MaterialTable
              icons={{
                Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
                Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
                Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
                Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
                DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
                Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
                Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
                Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
                FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
                LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
                NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
                PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
                ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
                Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
                SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
                ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
                ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
              }}
              title='Editable Preview'
              columns={columns}
              data={data}
              editable={{
                onRowAdd: (newData) =>
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      {
                        data.push(newData);
                      }
                      resolve();
                    }, 1000);
                  }),
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      {
                        const index = data.indexOf(oldData);
                        data[index] = newData;
                      }
                      resolve();
                    }, 1000);
                  }),
                onRowDelete: (oldData) =>
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      {
                        const index = data.indexOf(oldData);
                        data.splice(index, 1);
                      }
                      resolve();
                    }, 1000);
                  }),
              }}
            />
        </div>
      );

}

export default Collection;
