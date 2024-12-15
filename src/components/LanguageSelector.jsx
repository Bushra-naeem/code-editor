import React from 'react'
import { LANGUAGE_VERSIONS } from '../constants'
import {
    Box,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    Text
  } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'

const languages = Object.entries(LANGUAGE_VERSIONS)
const ACTIVE_COLOR = "blue.400";

const LanguageSelector = ({ language, onSelect }) => {
  return (
    <Box ml={2} mb={4}>
        <Text mb={2} fontSize="lg">Language:</Text>
        <Menu isLazy>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                {language}
            </MenuButton>
            <MenuList bg="#110c1b">
                {languages.map(([lang, version]) => (
                    <MenuItem 
                    key={lang}
                    color={lang === language ? ACTIVE_COLOR : ""}
                    bg={lang === language ? "gray.900" : "transparent"}
                    _hover={{
                      color: ACTIVE_COLOR,
                      bg: "gray.900",
                    }}      
                    onClick={() => onSelect(lang)}
                    >
                    {lang}
                    &nbsp;
                    <Text as="span" color="gray.600" fontSize="sm">
                        ({version})
                    </Text>
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    </Box>
  )
}

export default LanguageSelector
