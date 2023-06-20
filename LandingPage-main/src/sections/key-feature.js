/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Container, Grid } from 'theme-ui';
import SectionHeader from '../components/section-header';
import FeatureCardColumn from 'components/feature-card-column.js';

import Vector from 'assets/key-feature/vector.svg';
import Editing from 'assets/key-feature/editing.svg';
import Speed from 'assets/key-feature/speed.svg';

const data = [
  {
    id: 1,
    imgSrc: Vector,
    altText: 'Gesture Recognition',
    title: 'Gesture Recognition',
    text:
      'Utilizing computer vision to analyze and interpret human gestures to respond to specific commands, such as moving a finger upwards to scroll up the page, swiping left to go to the left tab, and so on.',
  },
  {
    id: 2,
    imgSrc: Editing,
    altText: 'Voice Commands',
    title: 'Voice Commands',
    text:
      'Using Natural Language Processing and Speech Recognition to perform specified tasks such as “Open new tab”, “Higher volume”, “Open Discord”, and much more!',
  },
  {
    id: 3,
    imgSrc: Speed,
    altText: 'Speen',
    title: 'Highly Responsive',
    text:
      'Fast and accurate resposes to your gestures and voice commands to provide a seamless user experience.',
  },
];

export default function KeyFeature() {
  return (
    <section sx={{ variant: 'section.keyFeature' }} id="feature">
      <Container>
        <SectionHeader
          slogan="Quality features"
          title="Meet the exciting features of HandsFree"
        />

        <Grid sx={styles.grid}>
          {data.map((item) => (
            <FeatureCardColumn
              key={item.id}
              src={item.imgSrc}
              alt={item.title}
              title={item.title}
              text={item.text}
            />
          ))}
        </Grid>
      </Container>
    </section>
  );
}

const styles = {
  grid: {
    px: [0, null, null, '40px', null, '80px'],
    pt: [0, null, null, null, null, null, null, 3],
    gridGap: ['35px 0', null, '40px 0'],
    gridTemplateColumns: [
      'repeat(1,1fr)',
      null,
      'repeat(2,1fr)',
      null,
      'repeat(3,1fr)',
    ],
    width: ['100%', '80%', '100%'],
    mx: 'auto',
    '& > div': {
      px: [0, '15px', null, '25px', null, '30px', '40px', '60px'],
    },
  },
};
