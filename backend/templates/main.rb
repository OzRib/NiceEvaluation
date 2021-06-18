require 'json'
require_relative "classes/template"

RULES = {
  '-t'=> ->(theme) {
    $theme = theme
  },
  '-q'=> ->(questions) {
    $questions = JSON.parse(questions)
  },
  '-n'=> ->(name) {
    $name = name
  }
}

for x in 0..ARGV.length-2
  arg = ARGV[x]
  nextArg = ARGV[x+1]

  unless RULES[arg] == nil
    RULES[arg].(nextArg)
  end
end

THEME = $theme
QUESTIONS = $questions
SUBJECTNAME = $name

template = Template.new(SUBJECTNAME, THEME, QUESTIONS)

response = {
  'prova'=>template.renderProva(),
  'gabarito'=>template.renderGabarito()
}

puts JSON.generate(response)
