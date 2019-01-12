{
  "targets": [{
    "target_name": "utp_native",
    'dependencies': [
      'deps/libutp.gyp:libutp',
    ],
    "include_dirs": [
      "<!(node -e \"require('napi-macros-nodejs-mobile')\")",
      "deps/libutp",
    ],
    "sources": [
      "./binding.cc",
    ],
    'xcode_settings': {
      'OTHER_CFLAGS': [
        '-O3',
      ]
    },
    'cflags': [
      '-O3',
    ],
    'conditions': [
      ['OS=="android"', {
        'cflags': ['-fPIC'],
        'ldflags': ['-fPIC']
      }, {
        # Refuse to build anything if OS is not android
        'type': "none"
      }]
    ],
  }]
}
