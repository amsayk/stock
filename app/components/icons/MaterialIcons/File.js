import React from 'react';
import T from 'prop-types';

function Unknown({ size, color }) {
  return (
    <svg
      fill={color}
      height={size}
      viewBox="0 0 1792 1792"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* <path d='M1152 512v-472q22 14 36 28l408 408q14 14 28 36h-472zm-128 32q0 40 28 68t68 28h544v1056q0 40-28 68t-68 28h-1344q-40 0-68-28t-28-68v-1600q0-40 28-68t68-28h800v544z'/> */}
      <path d="M1596 380q28 28 48 76t20 88v1152q0 40-28 68t-68 28h-1344q-40 0-68-28t-28-68v-1600q0-40 28-68t68-28h896q40 0 88 20t76 48zm-444-244v376h376q-10-29-22-41l-313-313q-12-12-41-22zm384 1528v-1024h-416q-40 0-68-28t-28-68v-416h-768v1536h1280z" />
    </svg>
  );
}

function Word({ size, color }) {
  return (
    <svg
      fill={color}
      height={size}
      viewBox="0 0 1792 1792"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1596 380q28 28 48 76t20 88v1152q0 40-28 68t-68 28h-1344q-40 0-68-28t-28-68v-1600q0-40 28-68t68-28h896q40 0 88 20t76 48zm-444-244v376h376q-10-29-22-41l-313-313q-12-12-41-22zm384 1528v-1024h-416q-40 0-68-28t-28-68v-416h-768v1536h1280zm-1175-896v107h70l164 661h159l128-485q7-20 10-46 2-16 2-24h4l3 24q1 3 3.5 20t5.5 26l128 485h159l164-661h70v-107h-300v107h90l-99 438q-5 20-7 46l-2 21h-4l-3-21q-1-5-4-21t-5-25l-144-545h-114l-144 545q-2 9-4.5 24.5t-3.5 21.5l-4 21h-4l-2-21q-2-26-7-46l-99-438h90v-107h-300z" />
    </svg>
  );
}

function Excel({ size, color }) {
  return (
    <svg
      fill={color}
      height={size}
      viewBox="0 0 1792 1792"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1596 380q28 28 48 76t20 88v1152q0 40-28 68t-68 28h-1344q-40 0-68-28t-28-68v-1600q0-40 28-68t68-28h896q40 0 88 20t76 48zm-444-244v376h376q-10-29-22-41l-313-313q-12-12-41-22zm384 1528v-1024h-416q-40 0-68-28t-28-68v-416h-768v1536h1280zm-979-234v106h281v-106h-75l103-161q5-7 10-16.5t7.5-13.5 3.5-4h2q1 4 5 10 2 4 4.5 7.5t6 8 6.5 8.5l107 161h-76v106h291v-106h-68l-192-273 195-282h67v-107h-279v107h74l-103 159q-4 7-10 16.5t-9 13.5l-2 3h-2q-1-4-5-10-6-11-17-23l-106-159h76v-107h-290v107h68l189 272-194 283h-68z" />
    </svg>
  );
}

function Image({ size, color }) {
  return (
    <svg
      fill={color}
      height={size}
      viewBox="0 0 1792 1792"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1596 380q28 28 48 76t20 88v1152q0 40-28 68t-68 28h-1344q-40 0-68-28t-28-68v-1600q0-40 28-68t68-28h896q40 0 88 20t76 48zm-444-244v376h376q-10-29-22-41l-313-313q-12-12-41-22zm384 1528v-1024h-416q-40 0-68-28t-28-68v-416h-768v1536h1280zm-128-448v320h-1024v-192l192-192 128 128 384-384zm-832-192q-80 0-136-56t-56-136 56-136 136-56 136 56 56 136-56 136-136 56z" />
    </svg>
  );
}

function Archive({ size, color }) {
  return (
    <svg
      fill={color}
      height={size}
      viewBox="0 0 1792 1792"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M768 384v-128h-128v128h128zm128 128v-128h-128v128h128zm-128 128v-128h-128v128h128zm128 128v-128h-128v128h128zm700-388q28 28 48 76t20 88v1152q0 40-28 68t-68 28h-1344q-40 0-68-28t-28-68v-1600q0-40 28-68t68-28h896q40 0 88 20t76 48zm-444-244v376h376q-10-29-22-41l-313-313q-12-12-41-22zm384 1528v-1024h-416q-40 0-68-28t-28-68v-416h-128v128h-128v-128h-512v1536h1280zm-627-721l107 349q8 27 8 52 0 83-72.5 137.5t-183.5 54.5-183.5-54.5-72.5-137.5q0-25 8-52 21-63 120-396v-128h128v128h79q22 0 39 13t23 34zm-141 465q53 0 90.5-19t37.5-45-37.5-45-90.5-19-90.5 19-37.5 45 37.5 45 90.5 19z" />
    </svg>
  );
}

function Pdf({ size, color }) {
  return (
    <svg
      fill={color}
      height={size}
      viewBox="0 0 1792 1792"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1596 380q28 28 48 76t20 88v1152q0 40-28 68t-68 28h-1344q-40 0-68-28t-28-68v-1600q0-40 28-68t68-28h896q40 0 88 20t76 48zm-444-244v376h376q-10-29-22-41l-313-313q-12-12-41-22zm384 1528v-1024h-416q-40 0-68-28t-28-68v-416h-768v1536h1280zm-514-593q33 26 84 56 59-7 117-7 147 0 177 49 16 22 2 52 0 1-1 2l-2 2v1q-6 38-71 38-48 0-115-20t-130-53q-221 24-392 83-153 262-242 262-15 0-28-7l-24-12q-1-1-6-5-10-10-6-36 9-40 56-91.5t132-96.5q14-9 23 6 2 2 2 4 52-85 107-197 68-136 104-262-24-82-30.5-159.5t6.5-127.5q11-40 42-40h22q23 0 35 15 18 21 9 68-2 6-4 8 1 3 1 8v30q-2 123-14 192 55 164 146 238zm-576 411q52-24 137-158-51 40-87.5 84t-49.5 74zm398-920q-15 42-2 132 1-7 7-44 0-3 7-43 1-4 4-8-1-1-1-2t-.5-1.5-.5-1.5q-1-22-13-36 0 1-1 2v2zm-124 661q135-54 284-81-2-1-13-9.5t-16-13.5q-76-67-127-176-27 86-83 197-30 56-45 83zm646-16q-24-24-140-24 76 28 124 28 14 0 18-1 0-1-2-3z" />
    </svg>
  );
}

function Text({ size, color }) {
  return (
    <svg
      fill={color}
      height={size}
      viewBox="0 0 1792 1792"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1596 380q28 28 48 76t20 88v1152q0 40-28 68t-68 28h-1344q-40 0-68-28t-28-68v-1600q0-40 28-68t68-28h896q40 0 88 20t76 48zm-444-244v376h376q-10-29-22-41l-313-313q-12-12-41-22zm384 1528v-1024h-416q-40 0-68-28t-28-68v-416h-768v1536h1280zm-1024-864q0-14 9-23t23-9h704q14 0 23 9t9 23v64q0 14-9 23t-23 9h-704q-14 0-23-9t-9-23v-64zm736 224q14 0 23 9t9 23v64q0 14-9 23t-23 9h-704q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h704zm0 256q14 0 23 9t9 23v64q0 14-9 23t-23 9h-704q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h704z" />
    </svg>
  );
}

function Audio({ size, color }) {
  return (
    <svg
      fill={color}
      height={size}
      viewBox="0 0 1792 1792"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1596 380q28 28 48 76t20 88v1152q0 40-28 68t-68 28h-1344q-40 0-68-28t-28-68v-1600q0-40 28-68t68-28h896q40 0 88 20t76 48zm-444-244v376h376q-10-29-22-41l-313-313q-12-12-41-22zm384 1528v-1024h-416q-40 0-68-28t-28-68v-416h-768v1536h1280zm-788-814q20 8 20 30v544q0 22-20 30-8 2-12 2-12 0-23-9l-166-167h-131q-14 0-23-9t-9-23v-192q0-14 9-23t23-9h131l166-167q16-15 35-7zm417 689q31 0 50-24 129-159 129-363t-129-363q-16-21-43-24t-47 14q-21 17-23.5 43.5t14.5 47.5q100 123 100 282t-100 282q-17 21-14.5 47.5t23.5 42.5q18 15 40 15zm-211-148q27 0 47-20 87-93 87-219t-87-219q-18-19-45-20t-46 17-20 44.5 18 46.5q52 57 52 131t-52 131q-19 20-18 46.5t20 44.5q20 17 44 17z" />
    </svg>
  );
}

function Video({ size, color }) {
  return (
    <svg
      fill={color}
      height={size}
      viewBox="0 0 1792 1792"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1596 380q28 28 48 76t20 88v1152q0 40-28 68t-68 28h-1344q-40 0-68-28t-28-68v-1600q0-40 28-68t68-28h896q40 0 88 20t76 48zm-444-244v376h376q-10-29-22-41l-313-313q-12-12-41-22zm384 1528v-1024h-416q-40 0-68-28t-28-68v-416h-768v1536h1280zm-640-896q52 0 90 38t38 90v384q0 52-38 90t-90 38h-384q-52 0-90-38t-38-90v-384q0-52 38-90t90-38h384zm492 2q20 8 20 30v576q0 22-20 30-8 2-12 2-14 0-23-9l-265-266v-90l265-266q9-9 23-9 4 0 12 2z" />
    </svg>
  );
}

Excel.propTypes = Audio.propTypes = Video.propTypes = Text.propTypes = Archive.propTypes = Pdf.propTypes = Image.propTypes = Unknown.propTypes = Word.propTypes = {
  color: T.string,
  size: T.number.isRequired,
};

Excel.defaultProps = Text.defaultProps = Audio.defaultProps = Video.defaultProps = Archive.defaultProps = Pdf.defaultProps = Image.defaultProps = Unknown.defaultProps = Word.defaultProps = {
  color: 'currentColor',
};

export default { Unknown, Word, Excel, Image, Archive, Pdf, Text, Audio, Video };