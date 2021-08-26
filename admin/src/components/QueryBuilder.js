import {Query, Builder, BasicConfig, Utils as QbUtils} from 'react-awesome-query-builder';
import MaterialConfig from 'react-awesome-query-builder/lib/config/material';
import 'react-awesome-query-builder/lib/css/styles.css';
import 'react-awesome-query-builder/lib/css/compact_styles.css'; //optional, for more compact styles
const InitialConfig = MaterialConfig; // or MaterialConfig or BasicConfig

const config = {
    ...InitialConfig,
    fields: {
      categories: {
          label: 'Category',
          type: 'select',
          valueSources: ['value'],
          fieldSettings: {
            listValues: [
              { value: 'christmas', title: 'Christmas' },
              { value: 'green', title: 'Green' },
              { value: 'orange', title: 'Orange' }
            ],
          }
      },
      price: {
          label: 'Price',
          type: 'number',
          valueSources: ['value'],
          fieldSettings: {
              min: 10,
              max: 100,
          },
          preferWidgets: ['slider', 'rangeslider'],
      },
      color: {
          label: 'Color',
          type: 'select',
          valueSources: ['value'],
          fieldSettings: {
            listValues: [
              { value: 'yellow', title: 'Yellow' },
              { value: 'green', title: 'Green' },
              { value: 'orange', title: 'Orange' }
            ],
          }
      },
      is_promotion: {
          label: 'Promo?',
          type: 'boolean',
          operators: ['equal'],
          valueSources: ['value'],
      },
    }
  };