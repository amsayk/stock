import React from 'react';
import Typography from 'material-ui/Typography';

import style from 'routes/Suppliers/styles';

export default function Empty() {
  return (
    <div className={style.empty}>
      <svg
        width={465.027 / 3}
        height={465.027 / 3}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 465.027 465.027"
        style={{ enableBackground: 'new 0 0 465.027 465.027' }}
      >
        <g>
          <g>
            <path
              style={{ fill: '#010002' }}
              d="M81.73,23.09c2.89,0.518,70.127,14.086,84.557,89.864c-18.292,19.327-29.638,46.42-29.638,76.512
      c0,0.28,0.022,0.539,0.022,0.798h191.678c0-0.259,0.043-0.518,0.043-0.798c0-30.113-11.389-57.184-29.703-76.533
      c14.452-75.778,81.732-89.346,84.644-89.864c6.256-1.165,10.44-7.183,9.319-13.525c-1.208-6.32-7.183-10.462-13.482-9.362
      c-0.841,0.151-78.302,15.143-100.52,96.421c-13.719-8.326-29.401-13.029-46.14-13.029c-16.674,0-32.399,4.746-46.118,13.029
      C164.173,15.324,86.713,0.333,85.893,0.182C79.573-0.94,73.598,3.245,72.39,9.565C71.225,15.907,75.431,21.947,81.73,23.09z"
            />
            <path
              style={{ fill: '#010002' }}
              d="M458.313,135.733c2.524-8.197-2.049-16.868-10.225-19.414c-8.218-2.502-16.847,2.049-19.371,10.268
      c0,0-18.961,61.132-22.994,74.225c-8.262,2.265-33.327,9.34-50.691,14.107c-0.626-2.761-1.165-5.544-1.769-8.24H111.8
      c-0.69,2.696-1.208,5.479-1.79,8.24c-17.386-4.789-42.494-11.842-50.713-14.107c-4.055-13.137-22.994-74.268-22.994-74.268
      c-2.502-8.197-11.238-12.748-19.392-10.246c-8.197,2.545-12.727,11.238-10.181,19.414l27.977,90.382l70.817,19.673
      c-0.539,6.622-0.884,13.18-0.884,19.953c0,8.305,0.453,16.458,1.208,24.461l-70.709,31.644L13.07,446.805
      c-1.51,8.434,4.077,16.459,12.533,17.99c8.434,1.467,16.48-4.163,17.947-12.597c0,0,16.76-94.782,19.263-108.781
      c6.773-3.085,29.207-13.05,48.254-21.592c16.804,71.464,64.799,123.148,121.444,123.148c56.666,0,104.705-51.684,121.487-123.148
      c19.025,8.542,41.481,18.508,48.254,21.592c2.438,13.999,19.263,108.781,19.263,108.781c1.445,8.434,9.534,14.064,17.99,12.597
      c8.434-1.532,14.021-9.556,12.49-17.99l-22.089-124.981l-70.687-31.623c0.755-8.003,1.23-16.157,1.23-24.461
      c0-6.73-0.388-13.331-0.884-19.953l70.817-19.673L458.313,135.733z"
            />
          </g>
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
          <g />
        </g>
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
        <g />
      </svg>

      <br />
      <br />

      <Typography type="title" align="center" gutterBottom>
        Aucun dépenses.
      </Typography>
      <Typography
        type="subheading"
        align="center"
        gutterBottom
        color="secondary"
      >
        Vos dépenses apparaîtront ici.
      </Typography>
    </div>
  );
}
