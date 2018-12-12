const types = {};
module.exports = ({
  message: {
    quick_reply: { payload },
  },
}) => types[payload];

module.exports.types = types;
// ? incoming text message
// {
//   object: 'page',
//   entry: [
//     {
//       id: '241493093110339',
//       time: 1544620032043,
//       messaging: [
//         {
//           recipient: { id: '241493093110339' },
//           timestamp: 1544620032043,
//           sender: { id: '1852210014835079' },
//           postback: { payload: 'FACEBOOK_WELCOME', title: 'Get Started' },
//         },
//       ],
//     },
//   ],
// };
