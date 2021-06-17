require 'json'
require_relative "classes/template"

RULES = {
  '-t'=> ->(theme) {
    $theme = theme
  },
  '-q'=> ->(questions) {
    $questions = JSON.parse(questions)
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

template = Template.new(THEME, QUESTIONS)

puts template.render() 
