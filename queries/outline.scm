; Outline entries for labels and named definitions
(command
  (command_name) @_name
  (arguments
    (word) @outline.name)
  (#match? @_name "^(label|variable|fix|compute|dump|region|group|pair_style|bond_style|angle_style|dihedral_style|improper_style|kspace_style)$")
) @outline.item
