interactor :off
notification :off

guard :shell do
  watch(%r[assets/]) {|m| `grunt` }
  watch(%r[spec/]) {|m| `grunt` }
  watch(%r[Gruntfile.js]) {|m| `grunt` }
end
