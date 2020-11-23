import $ from 'fire-keeper'

// function

async function compile_(): Promise<void> {

  await $.compile_([
    './source/**/*.pug',
    './source/**/*.ts'
  ], './dist', {
    base: './source'
  })
}

async function main_(): Promise<void> {

  await compile_()

  await $.exec_('electron .')
}

// export
export default main_